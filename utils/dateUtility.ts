
class DateUtility {


  /* 18 Mar 2025  02:30 pm */
  public formatDateTime(dateInput: Date | string | number): string {
    if (!dateInput) return "";
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date).replace(",", "");
  }



  /* 18 Mar 2025 */
  public formatDateOnly(dateInput: Date | string | number | null): string {

    if (!dateInput) return "";
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  }



  /* Monday, March 18, 2025 */
  public formatDateLong(dateInput: Date | string | number): string {
    if (!dateInput) return "";
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);

    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

}


const dateUtlity = new DateUtility();

export default dateUtlity;

