"use client";

import React, { useRef, useState } from "react";
import EmailEditor from "./email-editor";
import { EditorRef } from "../types/types";
// import sample from "/sample/sample.json";
import modals, { modalAction } from "../service/modal-manager";

const Example = () => {
  const emailEditorRef = useRef<EditorRef | null>(null);
  const [preview, setPreview] = useState(false);
  const [designName, setDesignName] = useState("");

  const ejectDesign = () => {
    const sampleList = localStorage.getItem("savedDesign");
    let parsedSampleList = [];
    if (sampleList) parsedSampleList = JSON.parse(sampleList);

    return parsedSampleList;
  };

  const handleSaveDesign = (list, name, openAlert = true) => {
    console.log("saveDesign", name);
    openAlert &&
      alert("Design JSON has been logged in your developer console.");
    localStorage.setItem("savedDesign", JSON.stringify(list.reverse()));
    setDesignName(name);
    modals.close();
  };

  const quickSave = () => {
    emailEditorRef.current?.editor?.saveDesign((design) => {
      let parsedSampleList = ejectDesign();
      const date = new Date();
      const humanFormat = `Quick save ${date.toLocaleString()}`;
      let name = humanFormat;

      const designIndex = parsedSampleList.findIndex(
        (el) => el.name === designName
      );

      if (designIndex !== -1) {
        parsedSampleList[designIndex].design = design;
        name = designName;
      } else {
        const payload = {
          name: humanFormat,
          design,
        };

        parsedSampleList.push(payload);
      }

      handleSaveDesign(parsedSampleList, name, false);
    });
  };

  const saveDesign = () => {
    emailEditorRef.current?.editor?.saveDesign((design) => {
      const handleSaveName = (name) => {
        let parsedSampleList = ejectDesign();

        const designIndex = parsedSampleList.findIndex(
          (el) => el.name === name
        );

        if (designIndex !== -1) {
          parsedSampleList[designIndex].design = design;
        } else {
          const payload = {
            name,
            design,
          };

          parsedSampleList.push(payload);
        }

        handleSaveDesign(parsedSampleList, name);
      };

      modals.call(modalAction.SAVE, { cb: handleSaveName, name: designName });
    });
  };

  const exportHtml = () => {
    emailEditorRef.current?.editor?.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
      alert("Output HTML has been logged in your developer console.");
    });
  };

  const exportFromLocalStorage = () => {
    const loadDesign = (design, name) => {
      emailEditorRef.current?.editor?.loadDesign(design);
      setDesignName(name);
      console.log(name);
    };

    const savedDesign = localStorage.getItem("savedDesign");
    let parsedSavedDesign = [];
    if (savedDesign) parsedSavedDesign = JSON.parse(savedDesign);

    modals.call(modalAction.LOAD, { list: parsedSavedDesign, cb: loadDesign });
  };

  const exportFromSample = () => {
    // emailEditorRef.current?.editor?.loadDesign("/sample/sample.json");
  };

  const togglePreview = () => {
    if (preview) {
      emailEditorRef.current?.editor?.hidePreview();
      setPreview(false);
    } else {
      emailEditorRef.current?.editor?.showPreview("desktop");
      setPreview(true);
    }
  };

  const onDesignLoad = (data) => {
    console.log("onDesignLoad", data);
  };

  const onReady = () => {
    emailEditorRef.current?.editor?.addEventListener(
      "design:loaded",
      onDesignLoad
    );
  };

  const quickSaveDesign = () => {
    quickSave();
  };

  const downloadFile = (design) => {
    const fileName = "sample";
    const json = JSON.stringify(design, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const downloadHandler = async () => {
    emailEditorRef.current?.editor?.saveDesign(async (design) => {
      try {
        downloadFile(design);
      } catch (error) {
        console.log("Error downloading file", error);
      }
    });
  };

  return (
    <div className="main-container">
      <div className="flex justify-between w-full">
        <div className="px-[40px] flex flex-col justify-center items-center">
          <h1 className="m-0">Email Editor</h1>
          <h2 className="m-0">Powered by Next JS</h2>
        </div>
        <div className="bar">
          <button onClick={togglePreview}>
            {preview ? "Hide" : "Show"} Preview
          </button>
          <button onClick={quickSaveDesign}>Quick Save</button>
          <button onClick={saveDesign}>Save Design</button>
          <button onClick={exportHtml}>Export HTML</button>
          <button onClick={exportFromLocalStorage}>From LocalStorage</button>
          <button onClick={exportFromSample}>Export Sample</button>
          <button onClick={downloadHandler}>Download Sample</button>
        </div>
      </div>

      <EmailEditor minHeight={"100%"} ref={emailEditorRef} onReady={onReady} />
    </div>
  );
};

export default Example;
