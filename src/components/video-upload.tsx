import { Button } from "@/components/ui/button";

import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type VideoUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
  
 
};

const VideoUploader = ({ fieldChange, mediaUrl }: VideoUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl); 

  console.log(file)
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
     
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [fieldChange]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
        'video/*': ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.webm'],
    },
  });
  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col rounded-xl cursor-pointer "
    >
      <input {...getInputProps()} />
      {fileUrl ? ( 
        <>
          <div className="flex flex-1 justify-center w-full py-3 px-1  "> 
           

        
          </div>
          <p className="text-xs text-gray-400 text-center">
            Click or Drag video to replace
          </p>
        </>
      ) : (
        <div className="flex justify-center items-center flex-center flex-col p-7 h-72 bg-gray-100 rounded-xl">
         
          <h3>Drag video here</h3>
        
          <Button className=" my-2">Select from Device</Button>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;