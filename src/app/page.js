// src/app/page.js

// Helper function to apply dynamic styles
const getThemeStyles = (theme, primaryColor, secondaryColor) => {
  // Basic theming logic. You can expand this with more complex styles.
  switch (theme) {
    case 'classic':
      return {
        header: { backgroundColor: primaryColor, color: 'white' },
        h2: { color: primaryColor, borderBottom: `2px solid ${secondaryColor}` },
        serviceCard: { borderLeft: `4px solid ${primaryColor}` }
      };
    case 'minimal':
        return {
            header: { backgroundColor: '#FFFFFF', color: '#333333', borderBottom: `1px solid #EAEAEA` },
            h2: { color: '#111111', borderBottom: `2px solid ${primaryColor}` },
            serviceCard: { border: `1px solid #EAEAEA`, borderRadius: '8px' }
        };
    case 'modern':
    default:
      return {
        header: { backgroundColor: primaryColor, color: 'white' },
        h2: { color: primaryColor, borderBottom: `2px solid ${secondaryColor}` },
        serviceCard: { backgroundColor: '#F9F9F9', borderLeft: `4px solid ${primaryColor}` }
      };
  }
};


export default function HomePage() {
  // Read all the website configuration from environment variables
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Company Name";
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL;
  const theme = process.env.NEXT_PUBLIC_THEME || 'modern';
  const primaryColor = process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#1E3A8A';
  const secondaryColor = process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#FBBF24';
  const aboutUsText = process.env.NEXT_PUBLIC_ABOUT_US_TEXT || "Welcome to our website!";
  const servicesListRaw = process.env.NEXT_PUBLIC_SERVICES_LIST || "[]";
  const contactInfoRaw = process.env.NEXT_PUBLIC_CONTACT_INFO || "{}";

  // Safely parse JSON strings for services and contact info
  let servicesList = [];
  try {
    servicesList = JSON.parse(servicesListRaw);
  } catch (e) {
    console.error("Failed to parse services list:", e);
  }

  let contactInfo = {};
  try {
    contactInfo = JSON.parse(contactInfoRaw);
  } catch (e) {
    console.error("Failed to parse contact info:", e);
  }

  const styles = getThemeStyles(theme, primaryColor, secondaryColor);

  return (
    <div className="font-sans max-w-4xl mx-auto p-4 md:p-8">
      <header style={styles.header} className="p-6 rounded-lg shadow-md flex items-center justify-between">
        {logoUrl ? (
          <img src={logoUrl} alt={`${companyName} Logo`} className="h-16" />
        ) : (
          <h1 className="text-3xl font-bold">{companyName}</h1>
        )}
      </header>

      <main className="mt-8">
        <section id="about" className="bg-white p-6 rounded-lg shadow">
          <h2 style={styles.h2} className="text-2xl font-bold pb-2 mb-4">About Us</h2>
          <p className="text-gray-700 whitespace-pre-line">{aboutUsText}</p>
        </section>

        <section id="services" className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 style={styles.h2} className="text-2xl font-bold pb-2 mb-4">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesList.length > 0 ? servicesList.map((service, index) => (
              <div key={index} style={styles.serviceCard} className="p-4 rounded-md">
                <h3 className="font-bold text-lg text-brand-dark">{service.title}</h3>
                <p className="text-gray-600 mt-1">{service.description}</p>
              </div>
            )) : (
              <p>No services listed.</p>
            )}
          </div>
        </section>

        <section id="contact" className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 style={styles.h2} className="text-2xl font-bold pb-2 mb-4">Contact Us</h2>
            {contactInfo.phone && <p><strong>Phone:</strong> {contactInfo.phone}</p>}
            {contactInfo.email && <p><strong>Email:</strong> {contactInfo.email}</p>}
            {contactInfo.address && <p><strong>Address:</strong> {contactInfo.address}</p>}
        </section>
      </main>
    </div>
  );
}