import {LicenseInfo} from '@mui/x-license-pro';
import ReactDOM from 'react-dom/client';
import App from './App';

console.warn = console.error = () => {};

LicenseInfo.setLicenseKey(
  '70d15cb7f993dd87d266ac090eb6bc5bTz02ODE4NSxFPTE3MTc3ODg2MDM3NjYsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=',
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
