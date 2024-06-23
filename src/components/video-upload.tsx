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

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      console.log('url=',URL.createObjectURL(acceptedFiles[0]))
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
            <img
              src={fileUrl} 
              alt="image"
              height={"100%"}
              width={"100%"}
              className="h-full lg:h-[330px] w-full rounded-[5px] object-cover object-top"
            />
          </div>
          <p className="text-xs text-gray-400 text-center">
            Click or Drag video to replace
          </p>
        </>
      ) : (
        <div className="flex justify-center items-center flex-center flex-col p-7 h-72 bg-gray-100 rounded-xl">
          {/* <img
            src="/assets/upload.svg"
            alt="file-upload"
            height={77}
            width={106} 
          /> */}
          <h3>Drag video here</h3>
        
          <Button className=" my-2">Select from Device</Button>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;