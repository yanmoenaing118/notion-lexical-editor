type Props = {
  showMe: boolean;
};

const FloatingToolbarComponent: React.FC<Props> = ({ showMe }) => {
  if (!showMe) return null;
  return (
    <div
      id="FloatingToolbarPlugin"
      className="shadow-lg p-3 rounded-md text-xl border absolute"
    >
      hi
    </div>
  );
};

export default FloatingToolbarComponent;
