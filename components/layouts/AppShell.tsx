import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { GlobalSettingsProvider } from "@/components/layouts/global-settings-context";
import { getGlobalSettings, getServices } from "@/sanity/lib/content";

const AppShell = async ({ children }: { children: React.ReactNode }) => {
  const [settings, services] = await Promise.all([
    getGlobalSettings(),
    getServices(),
  ]);
  const serviceLinks = services.map((service) => ({
    title: service.title,
    description: service.subtitle,
    href: `/${service.slug}`,
    icon: service.icon,
  }));

  return (
    <GlobalSettingsProvider settings={settings}>
      <Navbar
        content={settings.nav}
        navLinks={settings.navLinks}
        services={serviceLinks}
      />
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>
      <Footer
        settings={settings}
        navLinks={settings.navLinks}
        services={serviceLinks}
      />
    </GlobalSettingsProvider>
  );
};

export default AppShell;
