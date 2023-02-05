// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useLayoutEffect, useState } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import {
  COLUMN_DEFINITIONS,
  VISIBLE_CONTENT_OPTIONS,
  PAGE_SIZE_OPTIONS,
  SEARCHABLE_COLUMNS,
} from './table-select-filter-config';
import { CollectionPreferences, Input, Pagination, Select, Table } from '@cloudscape-design/components';
import '../../styles/table-select.scss';
import { instances } from '../../data/instances';
import { regions } from '../../data/regions';
import { getTextFilterCounterText, getHeaderCounterText, paginationAriaLabels } from '../../i18n-strings';
import { TableEmptyState, TableNoMatchState } from '../commons/common-components';
import { FullPageHeader } from '../commons';
import { useColumnWidths } from '../commons/use-column-widths';
import { useLocalStorage } from '../commons/use-local-storage';
import Tabs from '@cloudscape-design/components/tabs';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { Button } from '@cloudscape-design/components';

import { EstimateView } from './EstimateView';

const withSideEffect =
  (fn, sideEffect) =>
  (...args) => {
    sideEffect(...args);
    return fn(...args);
  };

const regionLabels = regions.map(region => {
  return `${region.full_name} - ${region.code}`;
});

const defaultRegion = { value: regionLabels[0].code, label: 'Choose a region' };
const selectRegion = prepareSelectRegion('region', defaultRegion);

function prepareSelectRegion(field, defaultOption) {
  const optionSet = [];
  // Building a non redundant list of the field passed as parameter.

  regionLabels.forEach(item => {
    if (optionSet.indexOf(item[field]) === -1) {
      optionSet.push(item);
    }
  });
  optionSet.sort();

  // The first element is the default one.
  const options = [defaultOption];

  // Adding the other element ot the list.
  regions.forEach(region => {
    options.push({ label: `${region.full_name} - ${region.code}`, value: region.code });
  });
  return options;
}

export function TableSelectFilter({ loadHelpPanelContent }) {
  const [columnDefinitions, saveWidths] = useColumnWidths('React-TableSelectFilter-Widths', COLUMN_DEFINITIONS);
  const [region, setRegion] = useState(defaultRegion);

  const [preferences, setPreferences] = useLocalStorage('React-InstancesTable-Preferences', {
    pageSize: 5,
    visibleContent: ['id', 'count', 'category', 'cpu', 'memory'],
    wrapLines: false,
    stripedRows: false,
    custom: 'table',
  });

  const [tableItems, setTableItems] = useState(instances);
  const persistChanges = () => {
    setTableItems(tableItems);
  };
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    tableItems,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Instance" />,
        noMatch: <TableNoMatchState onClearFilter={clearFilter} />,
        filteringFunction: (item, filteringText) => {
          const filteringTextLowerCase = filteringText.toLowerCase();

          return SEARCHABLE_COLUMNS.map(key => item[key]).some(
            value => typeof value === 'string' && value.toLowerCase().indexOf(filteringTextLowerCase) > -1
          );
        },
      },
      pagination: { pageSize: preferences.pageSize },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    }
  );

  const tablePaginationProps = {
    ...paginationProps,
    onChange: withSideEffect(paginationProps.onChange, persistChanges),
  };

  const onRefresh = () => {
    persistChanges();
    setTableItems(instances);
  };
  const refreshButtonProps = { onClick: onRefresh };

  useLayoutEffect(() => {
    collectionProps.ref.current?.scrollToTop();
  }, [region, collectionProps.ref, filterProps.filteringText]);

  function clearFilter() {
    actions.setFiltering('');
    setRegion(defaultRegion);
  }

  const handleSubmit = async (currentItem, column, value) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    let fullCollection = tableItems;

    const newItem = { ...currentItem, [column.id]: value };

    if (filterProps.filteringText) {
      fullCollection = tableItems;
    }

    setTableItems(fullCollection.map(item => (item.id === currentItem.id ? newItem : item)));
  };

  return (
    <>
      <SpaceBetween size="l">
        <Table
          {...collectionProps}
          columnDefinitions={columnDefinitions}
          visibleColumns={preferences.visibleContent}
          items={items}
          submitEdit={handleSubmit}
          variant="full-page"
          stickyHeader={true}
          resizableColumns={true}
          onColumnWidthsChange={saveWidths}
          wrapLines={preferences.wrapLines}
          stripedRows={preferences.stripedRows}
          header={
            <FullPageHeader
              title="Instances"
              selectedItemsCount={collectionProps.selectedItems.length}
              counter={getHeaderCounterText(tableItems, collectionProps.selectedItems)}
              extraActions={
                <Button data-testid="header-btn-view-details" {...refreshButtonProps}>
                  Reset instances
                </Button>
              }
              onInfoLinkClick={loadHelpPanelContent}
            />
          }
          filter={
            <div className="input-container">
              <div className="input-filter">
                <Input
                  data-testid="input-filter"
                  type="search"
                  value={filterProps.filteringText}
                  onChange={event => {
                    actions.setFiltering(event.detail.value);
                  }}
                  placeholder="Find instances"
                  label="Find instances"
                  clearAriaLabel="Clear"
                  ariaDescribedby={null}
                />
              </div>
              <div className="select-filter">
                <Select
                  data-testid="region-filter"
                  options={selectRegion}
                  selectedAriaLabel="Selected"
                  selectedOption={region}
                  onChange={event => {
                    setRegion(event.detail.selectedOption);
                  }}
                  ariaDescribedby={null}
                  expandToViewport={true}
                />
              </div>
              {(filterProps.filteringText || region !== defaultRegion) && (
                <span className="filtering-results">{getTextFilterCounterText(filteredItemsCount)}</span>
              )}
            </div>
          }
          pagination={<Pagination {...tablePaginationProps} ariaLabels={paginationAriaLabels} />}
          preferences={
            <CollectionPreferences
              title="Preferences"
              confirmLabel="Confirm"
              cancelLabel="Cancel"
              preferences={preferences}
              onConfirm={({ detail }) => setPreferences(detail)}
              pageSizePreference={{
                title: 'Page size',
                options: PAGE_SIZE_OPTIONS,
              }}
              wrapLinesPreference={{
                label: 'Wrap lines',
                description: 'Check to see all the text and wrap the lines',
              }}
              stripedRowsPreference={{
                label: 'Striped rows',
                description: 'Check to add alternating shaded rows',
              }}
              visibleContentPreference={{
                title: 'Select visible columns',
                options: VISIBLE_CONTENT_OPTIONS,
              }}
            />
          }
        />
        {region.value && (
          <Container>
            <EstimateTabs tableItems={tableItems} region={region.value} />
          </Container>
        )}
      </SpaceBetween>
    </>
  );
}

function EstimateTabs(props) {
  const { tableItems, region } = props;
  return (
    <Tabs
      tabs={[
        {
          label: 'Red Hat OpenShift Service on AWS',
          id: 'rosa',
          content: <EstimateView tableItems={tableItems} region={region} />,
        },
        {
          label: 'OpenShift Container Platform (OCP)',
          id: 'ocp',
          disabled: true,
        },
      ]}
    />
  );
}
