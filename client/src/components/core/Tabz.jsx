import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';

const Tabz = (props) => {
  const { data = [], id = 'tabz', activeTab, setActiveTab = () => {}, ...prop } = props;

  return (
    <Tabs id={id} value={activeTab} {...prop}>
      <TabsHeader
        className="rounded-none border-b border-border bg-transparent p-0"
        indicatorProps={{
          className: 'bg-transparent border-b-2 border-primary shadow-none rounded-none text-primary'
        }}
      >
        {data.map(({ label, value }) => (
          <Tab key={value} value={value} onClick={() => setActiveTab(value)} className={`font-medium z-0 ${value === activeTab ? 'text-primary' : ''}`}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        animate={{
          initial: { x: 1000 },
          mount: { x: 0 },
        }}
      >
        {data.map(({ value, children }) => {
          return (
            <TabPanel key={value} value={value}>
              {children() || ""}
            </TabPanel>
          );
        })}
      </TabsBody>
    </Tabs>
  );
};

export default Tabz;
