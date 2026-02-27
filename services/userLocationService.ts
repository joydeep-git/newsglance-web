import { LocationDataType } from "@/types/userLocationTypes";

// UserLocationService.ts
class UserLocationService {


  private locationData: LocationDataType = null;

  private position: GeolocationPosition | null = null;


  private async ensureLocation(): Promise<void> {


    if (this.locationData) return;

    try {
      this.position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
        });
      });

      const { latitude, longitude } = this.position.coords;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await res.json();

      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.state ||
        "Unknown";

      const countryCode = data.address.country_code?.toUpperCase() || "IN";

      this.locationData = {
        city,
        countryCode,
        lat: latitude,
        lon: longitude,
      };
    } catch (err) {
      
      console.log(err);

      this.locationData = {
        city: "New Delhi",
        countryCode: "IN",
        lat: 28.6139,
        lon: 77.2090,
      };
    }
  }

  public getUserDate(): string {
    return new Intl.DateTimeFormat(undefined, {
      month: "long",
      day: "numeric",
    }).format(new Date());
  }

  public getUserTime(): string {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date());
  }

  public async getLocationData() {
    await this.ensureLocation();
    return this.locationData!;
  }

  public async getTemperature(): Promise<string> {
    await this.ensureLocation();

    // Replace with actual API call to your backend
    const response = await fetch(
      `/api/weather?lat=${this.locationData!.lat}&lon=${this.locationData!.lon}`
    );

    const data = await response.json();
    return `${data.temperature}°C`;
  }

  public async getUserFullData() {
    await this.ensureLocation();

    const { city, countryCode, lat, lon } = this.locationData!;
    const temperature = await this.getTemperature();

    return {
      date: this.getUserDate(),
      time: this.getUserTime(),
      city,
      countryCode,
      lat,
      lon,
      temperature,
    };
  }
}

const userLocationService = new UserLocationService();


export default userLocationService;
