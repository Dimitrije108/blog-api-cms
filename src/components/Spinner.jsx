import { useState, useEffect } from "react";

export default function Spinner() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setShow(true), 300);
		return () => clearTimeout(timeout);
	}, []);

	if (!show) return null;

	return (
		<div className="flex items-center justify-center h-32 space-x-2">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.2}s` }}
        ></div>
      ))}
    </div>
	);
};
