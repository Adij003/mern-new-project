import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

// import { BlankView } from 'src/sections/blank/view';
import { ComponentHeader } from 'src/sections/dashboard/component-header';

// ----------------------------------------------------------------------

const metadata = { title: `Dashboard | ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {/* <BlankView title="Dashboard" /> */}
      <ComponentHeader title='Dashboard' subtitle='Verify and manage all your email lists in one place with the Pabbly Email Verification Dashboard.' />
    </>
  );
}
