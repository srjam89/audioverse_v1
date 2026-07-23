import DOMPurify from "dompurify";

export function Notifications({ status, message, customClass = "" }) {
  const getBgClass = () => {
    if (status === "success") return "success";
    if (status === "info") return "bg-blue-600";
    if (status === "error") return "error";
    if (status === "warning") return "bg-amber-500";
    return ""; // No background
  };

  const clean_message = DOMPurify.sanitize(message);

  return (
    <div className={`w-full mb-5 mt-2 ${customClass}`}>
      <div className="message_container">
        <div className={`px-4 p-2 rounded text-sm shadow-lg ${getBgClass()}`}>
          <span dangerouslySetInnerHTML={{ __html: clean_message }}></span>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
