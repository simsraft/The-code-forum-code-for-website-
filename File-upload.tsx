import { forwardRef } from "react";

interface FileUploadProps {
  accept?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ accept, onChange }, ref) => {
    return (
      <input
        type="file"
        className="hidden"
        ref={ref}
        accept={accept}
        onChange={onChange}
      />
    );
  }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;
