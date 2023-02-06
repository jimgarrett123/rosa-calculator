// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React, { useState, useRef } from 'react';
import { Breadcrumbs, ToolsContent } from './pages/cards/common-components';
import { CustomAppLayout, Navigation } from './pages/commons/common-components';
import { TableSelectFilter } from './pages/table-select-filter';
import './styles/base.scss';
import { Header } from './Header';
import { Footer } from './Footer';
import { SignInHeader } from './SignInHeader';
import { SignInFooter } from './SignInFooter';

const components = {
  Header,
  SignIn: {
    Header: SignInHeader,
    Footer: SignInFooter,
  },
  Footer,
};

export function Login() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef();

  return (
    <Authenticator components={components}>
      {({ signOut, user }) => (
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
      )}
    </Authenticator>
  );
}
