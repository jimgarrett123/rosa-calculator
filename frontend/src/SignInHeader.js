// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Heading, useTheme } from '@aws-amplify/ui-react';
import React from 'react';
import Alert from '@cloudscape-design/components/alert';

export function SignInHeader() {
  const { tokens } = useTheme();

  return (
    <Heading level={3} padding={`${tokens.space.xl} ${tokens.space.xl} 0`}>
      <Alert statusIconAriaLabel="Info" header="User access">
        <ul>
          <li>
            <>Use your work email to sign up</>
          </li>
          <li>
            <strong>
              Do NOT use your <u>work password when sign up</u>.
            </strong>
            &nbsp; This site is not connected to your SSO.
          </li>
        </ul>
      </Alert>
    </Heading>
  );
}
