

import LanguageProvider from '../components/LanguageContext';
import LayoutContent from '../components/LayoutContent';
import { ThemeProvider } from '../components/ThemeContext';
import './globals.css';

export const metadata = {
  title: 'Islam Web App',
  description: 'A sample Islam Web App',
};

export default function RootLayout({ children }) {
  return (
    <html dir="auto" lang="en">
      <body >
        <ThemeProvider>
          <LanguageProvider>
            <LayoutContent>{children}</LayoutContent>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
