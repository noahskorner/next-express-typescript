import useWindowSize from '../../../utils/hooks/use-window-size';

interface GlobalLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  const { heightStyle, widthStyle } = useWindowSize();

  return (
    <div
      style={{ width: widthStyle, height: heightStyle }}
      className="font-primary"
    >
      {children}
    </div>
  );
};

export default GlobalLayout;
