// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React, { useState, useRef } from 'react';
import { Breadcrumbs, ToolsContent } from './pages/cards/common-components';
import { CustomAppLayout, Navigation, Notifications } from './pages/commons/common-components';
import { AttributeEditor, Input } from '@cloudscape-design/components';
import './styles/base.scss';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const App = ({ signOut, user }) => {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef();

  const [items, setItems] = React.useState([
    { key: 'some-key-1', value: 'some-value-1' },
    { key: 'some-key-2', value: 'some-value-2' },
  ]);

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/distributions" />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <AttributeEditor
          onAddButtonClick={() => setItems([...items, {}])}
          onRemoveButtonClick={({ detail: { itemIndex } }) => {
            const tmpItems = [...items];
            tmpItems.splice(itemIndex, 1);
            setItems(tmpItems);
          }}
          items={items}
          addButtonText="Add instance type"
          definition={[
            {
              label: 'Instance name',
              control: item => <Input value={item.key} placeholder="Enter key" />,
            },
            {
              label: 'Number of instances',
              control: item => <Input value={item.value} placeholder="Enter value" />,
            },
          ]}
          removeButtonText="Remove"
          empty="No items associated with the resource."
        />
      }
      contentType="cards"
      tools={<ToolsContent />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      stickyNotifications={true}
    />
  );
};

export default withAuthenticator(App);
