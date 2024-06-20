import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import ProgressBar from "@ramonak/react-progress-bar";

type UploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl : any;
};

const Uploader = ({ fieldChange, mediaUrl }: UploaderProps) => {
 console.log(',url=',mediaUrl)
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl); 

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      console.log('g=',URL.createObjectURL(acceptedFiles[0]))
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [fieldChange]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
     
    'video/*': ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.webm'],
    'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.gif', '.bmp'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'application/vnd.ms-powerpoint': ['.ppt'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    'text/*': ['.txt', '.csv'],
    'application/zip': ['.zip'],
    },
  });
  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col rounded-xl cursor-pointer  "
    >
      <input {...getInputProps()} />
      {fileUrl ? (
        <>
        
          <div className="flex flex-1 justify-center w-full py-3 px-1   ">
            {/* <img
              src={fileUrl}
              alt={mediaUrl[0].name}
              height={"100%"}
              width={"100%"}
              className="h-full lg:h-[100%] w-full rounded-[24px] object-cover object-top "
            /> */}

<ProgressBar completed={80}
  className="wrapper"
  barContainerClassName="container"
  completedClassName="barCompleted"
  labelClassName="label" />
          </div>
          <p className="text-xs text-gray-400 text-center"> 
            Click or Drag to add file
          </p>
          
          
        </>
      ) : (
        <div className="flex justify-center items-center flex-center flex-col p-7 h-72 bg-gray-100 rounded-xl border border-blue-800">
          <img
            src="/assets/upload.svg"
            alt="file-upload"
            height={77}
            width={106}
          /> 
         
          <p className="text-xs text-gray-400">IMAGE,PDF,VIDEO,AUDIO,DOC</p>
          <Button className=" my-2">Select from Device</Button> 
        </div>
     )}
    </div>
  );
};

export default Uploader;
