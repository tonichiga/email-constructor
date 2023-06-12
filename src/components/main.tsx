"use client";

import React, { useRef, useState } from "react";
import EmailEditor from "./email-editor";
import { EditorRef } from "../types/types";
import sample from "../assets/sample/sample.json";
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

  const exportHtml = (needDownload = false, callback?) => {
    emailEditorRef.current?.editor?.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml>>>>>>>>>>>>", html);

      if (needDownload) {
        callback(html);
        return;
      }
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
    emailEditorRef.current?.editor?.loadDesign(sample);
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

  const downloadFile = (design, options) => {
    console.log("CALL");
    const fileName = "sample";
    const json = design;
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + `.${options.type}`;
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const downloadHandler = async () => {
    emailEditorRef.current?.editor?.saveDesign(async (design) => {
      try {
        let designJson = JSON.stringify(design);
        downloadFile(designJson, { type: "json" });
      } catch (error) {
        console.log("Error downloading file", error);
      }
    });
  };

  const downloadHTMLHandler = async () => {
    exportHtml(true, (html) => {
      downloadFile(html, { type: "html" });
    });
  };

  const exportFromJson = (event) => {
    const file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = () => {
      const data = reader.result as any;
      const obj = JSON.parse(data);
      emailEditorRef.current?.editor?.loadDesign(obj);
    };

    reader.readAsText(file);
  };

  return (
    <div className="main-container">
      <div className="flex justify-between w-full">
        <div className="bar">
          <button onClick={togglePreview}>
            {preview ? "Hide" : "Show"} Preview
          </button>

          <button onClick={quickSaveDesign}>Quick save</button>
          <button onClick={saveDesign}>Save design</button>
          <button
            onClick={() => {
              exportHtml();
            }}
          >
            Export HTML
          </button>
          <button onClick={exportFromLocalStorage}>From Localstorage</button>
          <button onClick={exportFromSample}>Export example</button>
          <div className="file-upload">
            <label>
              <input type="file" name="file" onChange={exportFromJson} />
              <span>Export JSON</span>
            </label>
          </div>
          <button onClick={downloadHandler}>Download JSON</button>
          <button onClick={downloadHTMLHandler}>Download HTML</button>
        </div>
      </div>

      <EmailEditor minHeight={"100%"} ref={emailEditorRef} onReady={onReady} />
    </div>
  );
};

export default Example;
