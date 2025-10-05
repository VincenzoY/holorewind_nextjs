import { RewindDataOptions } from "../rewind"


export const rewindPostRequest = async (file: File, options: RewindDataOptions) => {
  const formData  = new FormData();

  formData.append("watch_history", file);
  formData.append("options", JSON.stringify(options))

  return await fetch("/create-rewind", {
    method: 'POST',
    body: formData
  });
}