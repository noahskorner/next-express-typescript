import useWindowSize from '../../../utils/hooks/use-window-size';

const Sidebar = () => {
  const { heightStyle } = useWindowSize();

  return (
    <div
      style={{ height: heightStyle }}
      className="w-full md:w-sidebar bg-slate-800 overflow-hidden rounded-r-3xl md:rounded-r-none"
    >
      <div className="h-header shadow-header"></div>
      <div className="h-body overflow-y-auto space-y-2"></div>
    </div>
  );
};

export default Sidebar;
