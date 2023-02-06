// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React, { useState, useRef } from 'react';
import { Breadcrumbs, ToolsContent } from './pages/cards/common-components';
import { CustomAppLayout, Navigation } from './pages/commons/common-components';
import { TableSelectFilter } from './pages/table-select-filter';
import './styles/base.scss';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const App = ({ signOut, user }) => {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef();

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/instances" />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <TableSelectFilter
          loadHelpPanelContent={() => {
            appLayout.current?.focusToolsClose();
            setToolsOpen(true);
          }}
          signOut={signOut}
        />
      }
      signOut={signOut}
      user={user}
      contentType="table"
      tools={<ToolsContent />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
    />
  );
};

export default withAuthenticator(App);
