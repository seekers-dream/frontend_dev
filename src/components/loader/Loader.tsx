import { SyncLoader } from 'react-spinners';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[25px]">
      <SyncLoader color="#FFFF" size={5} />
    </div>
  );
};
export default Loader;
