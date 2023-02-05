// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Input from '@cloudscape-design/components/input';
import { createTableSortLabelFn } from '../../i18n-strings';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const rawColumns = [
  {
    id: 'id',
    header: 'Instance name',
    cell: item => item.id,
    minWidth: 150,
  },
  {
    sortingField: 'id',
  },
  {
    id: 'count',
    header: 'Number of instances',
    minWidth: 180,
    editConfig: {
      ariaLabel: 'Edit domain name',
      errorIconAriaLabel: 'Domain Name Validation Error',
      editIconAriaLabel: 'editable',
      editingCell: (item, { setValue, currentValue }) => {
        return (
          <Input
            autoFocus={true}
            ariaLabel="Edit domain name"
            value={currentValue ?? item.count}
            onChange={event => {
              setValue(event.detail.value);
            }}
            placeholder="Enter domain name"
          />
        );
      },
    },
    cell: item => {
      return item.count;
    },
  },
  // {
  //   id: 'count',
  //   header: 'Number of instances',
  //   cell: item => item.count,
  //   maxWidth: 10,
  //   editConfig: {
  //     ariaLabel: 'Edit number of instances',
  //     errorIconAriaLabel: 'Number of instances error',
  //     editIconAriaLabel: 'editable',
  //     editingCell: (item, { currentValue, setValue }) => {
  //       let options = [];
  //       for (let i = 0; i <= 100; i++) {
  //         options.push({ value: `${item.id}|${i}`, label: i });
  //       }

  //       const value = currentValue ?? `${item.id}|${item.count}`;

  //       return (
  //         <Select
  //           autoFocus={true}
  //           expandToViewport={true}
  //           ariaLabel="Select desired state"
  //           options={options}
  //           onChange={event => {
  //             setValue(event.detail.selectedOption.value ?? item.count);
  //           }}
  //           selectedOption={options.find(option => option.value === value) ?? null}
  //         />
  //       );
  //     },
  //   },
  // },
  {
    id: 'category',
    header: 'Category',
    cell: item => capitalizeFirstLetter(item.category).split('_').join(' '),
    maxWidth: 80,
  },
  {
    id: 'cpu',
    header: 'vCPUs',
    cell: item => item.cpu.value,
  },
  {
    id: 'memory',
    header: 'Memory',
    cell: item => `${item.memory.value / 1073741824} GiB`,
  },
];

export const COLUMN_DEFINITIONS = rawColumns.map(column => ({ ...column, ariaLabel: createTableSortLabelFn(column) }));

export const SEARCHABLE_COLUMNS = ['id', 'category', 'cpu', 'memory'];

export const VISIBLE_CONTENT_OPTIONS = [
  {
    label: 'Main instance properties',
    options: [
      { id: 'id', label: 'Instance name', editable: false },
      { id: 'count', label: 'Number of instances', editable: true },
      { id: 'category', label: 'Category' },
      { id: 'cpu', label: 'vCPUs' },
      { id: 'memory', label: 'Memory' },
    ],
  },
];

export const PAGE_SIZE_OPTIONS = [
  { value: 5, label: '5 Instances' },
  { value: 10, label: '10 Instances' },
  { value: 30, label: '30 Instances' },
];
