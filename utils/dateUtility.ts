
class DateUtility {


  private getOrdinal(day: number): string {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  
  public formatDate(dateInput: Date | string | number): string {

    const date = new Date(dateInput);

    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString("en-GB", { month: "long" });

    const time = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).toLowerCase();

    return `${day}${this.getOrdinal(day)} ${month}, ${year} at ${time}`;
  }

}


const dateUtlity = new DateUtility();

export default dateUtlity;

