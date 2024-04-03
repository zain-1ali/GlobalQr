import React, { useState } from "react";
import "../Styles/QrContainerSection.scss";
import { Menu, MenuItem, Slider, styled } from "@mui/material";
import { FiDownload } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { QRCode } from "react-qrcode-logo";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface SetColorProps {
  qrInfo: {
    value: string;
    forColor: string;
    iColor: string;
    forColor2: string;
    iColor2: string;
    bgColor: string;
    logo: string | undefined;
    bShape: "squares" | "dots" | undefined;
    iShape: [number, number, number, number];
    fShape: [number, number, number, number];
  };
}

const QrContainerSection: React.FC<SetColorProps> = ({ qrInfo }) => {
  console.log(qrInfo);
  const iOSBoxShadow =
    "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

  const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === "dark" ? "#0a84ff" : "#FE5B24",
    height: 5,
    padding: "15px 0",
    "& .MuiSlider-thumb": {
      height: 20,
      width: 20,
      backgroundColor: "#FE5B24",
      boxShadow: "0 0 2px 0px rgba(0, 0, 0, 0.1)",
      "&:focus, &:hover, &.Mui-active": {
        boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          boxShadow: iOSBoxShadow,
        },
      },
      "&:before": {
        boxShadow:
          "0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)",
      },
    },
    "& .MuiSlider-valueLabel": {
      fontSize: 12,
      fontWeight: "normal",
      top: -6,
      backgroundColor: "unset",
      color: theme.palette.text.primary,
      "&::before": {
        display: "none",
      },
      "& *": {
        background: "transparent",
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
      },
    },
    "& .MuiSlider-track": {
      border: "none",
      height: 5,
    },
    "& .MuiSlider-rail": {
      opacity: 0.5,
      boxShadow: "inset 0px 0px 4px -2px #000",
      backgroundColor: "#d0d0d0",
    },
  }));
  console.log(qrInfo?.fShape);

  // const downloadQRCode = (format: "jpg" | "png" | "pdf") => {
  //   const qrCodeElement = document.getElementById("qrCodeContainer");

  //   if (!qrCodeElement) {
  //     console.error("QR code container not found.");
  //     return;
  //   }

  //   if (format === "pdf") {
  //     html2canvas(qrCodeElement).then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF("p", "mm", "a4");
  //       const imgWidth = 210;
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //       pdf.save("QRCode.pdf");
  //     });
  //   } else {
  //     html2canvas(qrCodeElement).then((canvas) => {
  //       const imgData = canvas.toDataURL(`image/${format}`);
  //       const downloadLink = document.createElement("a");
  //       downloadLink.href = imgData;
  //       downloadLink.download = `QRCode.${format}`;
  //       downloadLink.click();
  //     });
  //   }
  // };

  const downloadQRCode = (format: "jpg" | "png" | "pdf", quality: number) => {
    const qrCodeElement = document.getElementById("qrCodeContainer");

    if (!qrCodeElement) {
      console.error("QR code container not found.");
      return;
    }

    if (format === "pdf") {
      html2canvas(qrCodeElement, { scale: quality / 100 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("QRCode.pdf");
      });
    } else {
      html2canvas(qrCodeElement, { scale: quality / 100 }).then((canvas) => {
        const imgData = canvas.toDataURL(`image/${format}`, quality / 100);
        const downloadLink = document.createElement("a");
        downloadLink.href = imgData;
        downloadLink.download = `QRCode.${format}`;
        downloadLink.click();
      });
    }
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [format, setFormat] = useState<"jpg" | "png" | "pdf">("png");

  const [quality, setquality] = useState<number>(100);

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    setquality(newValue as number);
    console.log(event);
  };

  return (
    <div className="container-main">
      <QRCode
        id="qrCodeContainer"
        value={qrInfo?.value}
        size={250}
        fgColor={qrInfo?.forColor}
        bgColor={qrInfo?.bgColor}
        eyeColor={qrInfo?.iColor}
        qrStyle={qrInfo?.bShape}
        logoImage={qrInfo?.logo}
        eyeRadius={[
          {
            // top/left eye
            outer: qrInfo?.fShape,
            inner: qrInfo?.iShape,
          },
          {
            // top/left eye
            outer: qrInfo?.fShape,
            inner: qrInfo?.iShape,
          },
          {
            // top/left eye
            outer: qrInfo?.fShape,
            inner: qrInfo?.iShape,
          },
        ]}
      />

      <div className="slider-main">
        <IOSSlider
          aria-label="ios slider"
          defaultValue={60}
          value={quality}
          onChange={handleChangeSlider}
          // valueLabelDisplay="on"
        />
        <div className="slider-label">
          <p>Low Quality</p>
          <p>High Quality</p>
        </div>
      </div>
      <div className="buttons-main">
        {/* <button>Create QR Code</button> */}
        <div className="selector">
          <div
            className="select-option"
            onClick={() => downloadQRCode(format, quality)}
          >
            <FiDownload style={{ fontSize: "24px" }} />
            <p>Download {format}</p>
          </div>
          <div
            className="select-icon"
            // component="aria-expanded"
            // aria-label="Device settings"
            id="lang-button"
            aria-haspopup="listbox"
            aria-controls="lang-menu"
            // aria-expanded={openMenu ? "true" : undefined}
            onClick={handleClickListItem}
          >
            <IoIosArrowDown style={{ fontSize: "24px" }} />
          </div>
          <Menu
            id="lang-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lang-button",
              role: "listbox",
            }}
          >
            <MenuItem
              onClick={() => {
                setFormat("png"), handleClose();
              }}
              sx={{ display: "flex" }}
            >
              .png
            </MenuItem>
            <MenuItem
              onClick={() => {
                setFormat("jpg"), handleClose();
              }}
              sx={{ display: "flex" }}
            >
              .jpg
            </MenuItem>
            <MenuItem
              onClick={() => {
                setFormat("pdf"), handleClose();
              }}
              sx={{ display: "flex" }}
            >
              .pdf
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default QrContainerSection;
