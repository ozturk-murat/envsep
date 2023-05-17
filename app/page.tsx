"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Card from "./components/card";

export default function Home() {
  const [items, setItems] = useState<{ key: string; value: string; }[]>([]);
  const [showCard, setShowCard] = useState(true);

  const handleCardClose = () => {
    setShowCard(false);
  };


  useEffect(() => {
    if (items.length === 0) {
      setItems([
        {
          key: "",
          value: "",
        },
      ]);
    }
  }, [items]);

  const pasteHandle = (e: any, index: number) => {
    const pastedData = e.clipboardData.getData("text");
    if (pastedData) {
      const arr = pastedData
        .split("\n")
        .map((text: string) => {
          if (/([\w]+)=(.+?)/.test(text)) {
            let [key, ...value] = text.split("=");
            let find = items.find((i) => i.key === key);
            if (!find || find?.key === items[index].key) {
              return { key, value: value.join("=") };
            }
          }
        })
        .filter(Boolean);
      if (arr.length > 0) {
        e.preventDefault();
        setItems((items) => [
          ...items.slice(0, index),
          ...arr,
          ...items.slice(index + 1),
        ]);
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {showCard && <Card onClose={handleCardClose} />}
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.1rem_#ffffff70]"
          src="/envsep_logo.svg"
          alt="Weather Scale Logo"
          width={308}
          height={44}
          priority
        />
      </div>
      <div className="h-[100vh] overflow-auto ">
        <div className="container mx-auto py-4 ">
          <pre className="bg-white/10 mt-4 p-4 rounded text-white">
            <p>STAGING_HOST=staging.site.io</p>
            <p>PROD_HOST=site.io</p>
            <p>API_KEY=2432ERMSDDFM3234</p>
          </pre>
          <p className="text-xl font-light text-white my-4">
            Please{" "}
            <kbd className="bg-white/20 py-1 px-2 rounded text-base">
              ctrl + c
            </kbd>{" "}
            sample{" "}
            <code className="bg-blue-400/40 rounded text-base">.env</code>{" "}
            key/values above to test the form and how it works. Click any of the
            inputs on the left,{" "}
            <kbd className="bg-white/20 py-1 px-2 rounded text-base">
              ctrl + v
            </kbd>{" "}
            and paste.
          </p>
          <div className="grid gap-y-4 rounded-lg">
            {items.map((item, index) => (
              <div className="flex gap-x-4">
                <input
                  onPaste={(e) => pasteHandle(e, index)}
                  key={index}
                  onChange={(e) => {
                    setItems((items) =>
                      items.map((item, i) => {
                        if (i === index) {
                          item.key = e.target.value;
                        }
                        return item;
                      })
                    );
                  }}
                  placeholder="Örn: API_URL"
                  className="flex-1 h-10 placeholder:text-black/50 rounded border border-white/20 text-sm px-3 text-black outline-none"
                  type="text"
                  value={item.key}
                />
                <input
                  onChange={(e) => {
                    setItems((items) =>
                      items.map((item, i) => {
                        if (i === index) {
                          item.value = e.target.value;
                        }
                        return item;
                      })
                    );
                  }}
                  className="flex-1 h-10 placeholder:text-black/50 rounded border border-white/20 text-sm px-3 text-black outline-none"
                  type="text"
                  value={item.value}
                />
                <button
                  onClick={() =>
                    setItems((items) => items.filter((_, key) => key !== index))
                  }
                  className="h-10 w-10 bg-red-500 rounded text-white text-sm"
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              setItems((items) => [
                ...items,
                {
                  key: "",
                  value: "",
                },
              ])
            }
            className="h-10 px-4 rounded border border-blue-500 text-blue-500 flex items-center text-sm mt-4"
          >
            Yeni Ekle
          </button>
          <pre className="bg-white/10 mt-4 p-4 rounded text-white">
            {JSON.stringify(items, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}
