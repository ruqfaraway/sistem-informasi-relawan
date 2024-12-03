import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ImageUpload = () => {
  return (
    <div>
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  );
};

export default ImageUpload;
