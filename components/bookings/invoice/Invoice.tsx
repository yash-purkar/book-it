"use client"
import { IBooking } from "@/backend/models/booking";
import React from "react";
import styles from "./invoice.module.css";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface InvoiceProps {
  data: {
    booking: IBooking;
  };
}

export const Invoice: React.FC<InvoiceProps> = ({ data }) => {
  const { booking } = data;

  const handleDownloadInvoice = () => {
    const elementToBeCaptured = document.getElementById("booking_invoice");

    if (elementToBeCaptured) {
      html2canvas(elementToBeCaptured).then((canvas) => {
        //Img in png
        const imageData = canvas.toDataURL("image/png");

        //creating instance of jsPDF.
        const pdf = new jsPDF();
        //Width of the pdf
        const pdfWidth = pdf.internal.pageSize.getWidth();
        //adding image in the pdf
        pdf.addImage(imageData, 0, 0, pdfWidth, 0);
        //saving pdf in the system
        pdf.save(`invoice_${booking._id}.pdf`);
      });
    } else {
      toast.error("Failed to download invoice!");
    }
  };

  return (
    <div className="container">
      <div className={`${styles["order-invoice"]} my-5`}>
        <div className="row d-flex justify-content-center mb-5">
          <button
            onClick={handleDownloadInvoice}
            className="btn btn-success col-md-5"
          >
            <i className="fa fa-print"></i> Download Invoice
          </button>
        </div>
        <div className="px-5">
          <div id="booking_invoice" className="px-4 border border-secondary">
            <header className="clearfix">
              <div id={styles.logo} className="my-4">
                <img src="/images/bookit_logo.png" />
              </div>
              <h1>INVOICE # {booking._id}</h1>
              <div id={styles.company} className="clearfix">
                <div>BookIT</div>
                <div>
                  Sector 63,
                  <br />
                  Noida
                </div>
                <div>(602) 519-0450</div>
                <div>
                  <a href="mailto:info@bookit.com">yashpurkar7079@gmail.com</a>
                </div>
              </div>
              <div id={styles.project}>
                <div>
                  <span>Name</span> {booking.user.name}
                </div>
                <div>
                  <span>EMAIL</span> {booking.user.email}
                </div>
                <div>
                  <span>DATE</span> {booking.createdAt.toLocaleString("en-us")}
                </div>
                <div>
                  <span>Status</span> {booking.paymentInfo.status.toUpperCase()}
                </div>
              </div>
            </header>
            <main>
              <table className="mt-5">
                <thead>
                  <tr>
                    <th className={styles.service}>Room</th>
                    <th className={styles.desc}>Price Paid</th>
                    <th>Check In Date</th>
                    <th>Check Out Date</th>
                    <th>Days of Stay</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.service}>Room Name</td>
                    <td className={styles.desc}>${booking.amountPaid}</td>
                    <td className="unit">
                      {booking.checkInDate.toLocaleString("en-us")}
                    </td>
                    <td className="qty">
                      {booking.checkoutDate.toLocaleString("en-us")}
                    </td>
                    <td className="qty">{booking.daysOfStay}</td>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      className={`${styles.grand} ${styles.total}`}
                    >
                      <b>GRAND TOTAL</b>
                    </td>
                    <td className={`${styles.grand} ${styles.total}`}>
                      ${booking.amountPaid}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div id={styles.notices}>
                <div>NOTICE:</div>
                <div className={styles.notice}>
                  A finance charge of 1.5% will be made on unpaid balances after
                  30 days.
                </div>
              </div>
            </main>
            <footer className="pb-5">
              Invoice was created on a computer and is valid without the
              signature.
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
