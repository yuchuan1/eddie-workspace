import React from 'react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  react: {
    strictMode: false,
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for charts',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
};

const ThemeSetter = ({
  theme,
  children,
}: {
  theme: string;
  children: React.ReactNode;
}) => {
  React.useEffect(() => {
    document.body.style.backgroundColor =
      theme === 'dark' ? '#1a1a1a' : '#ffffff';
  }, [theme]);

  return React.createElement(React.Fragment, null, children);
};

export const decorators = [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Story: any, context: any) => {
    const theme = context.globals.theme;
    return React.createElement(
      ThemeSetter,
      { theme },
      React.createElement(Story, { theme })
    );
  },
];
