import type { Preview } from '@storybook/react';
import React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import theme from './theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme,
    },
    options: {
      storySort: {
        order: ['Components', '*'],
      },
    },
  },
  decorators: [
    (Story) => (
      <FluentProvider theme={webLightTheme}>
        <Story />
      </FluentProvider>
    ),
  ],
};

export default preview;
