import { Loader2 } from "lucide-react";
import React from "react";

const MainLoaderComps = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
};

export default MainLoaderComps;
