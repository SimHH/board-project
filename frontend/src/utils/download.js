import { secureDownload } from "../api/post";

export const handleFileDownload = async (filename) => {
  try {
    const res = await secureDownload(filename);
    const blob = new Blob([res.data]);
    const downloadUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename.split("-").slice(1).join("-"); // 원래 파일명 복원
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    alert("파일 다운로드 실패");
    console.error("파일 다운로드 에러:", err);
  }
};