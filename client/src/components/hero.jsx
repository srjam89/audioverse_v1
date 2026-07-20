import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruckMoving,
  faShield,
  faArrowRotateLeft,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  return (
    <section className="grid grid-cols-12 p-2">
      <div className="col-span-6 py-8">
        <h3 className="text-(--accent) text-1xl font-bold tracking-(--large-letter-spacing) mb-4">
          DOMINATE EVERY SOUND
        </h3>
        <h1 className="text-6xl font-bold tracking-(--large-letter-spacing)">
          LEVEL UP
        </h1>
        <h1 className="text-6xl font-bold text-(--accent) tracking-(--large-letter-spacing)">
          YOUR AUDIO
        </h1>
        <div className="mt-4">
          <p className="text-(--muted-foreground)">
            High performance gear for gamers
          </p>
          <p className="text-(--muted-foreground)">who demand the best</p>
        </div>
        <div className="btn-group mt-4 flex gap-2">
          <Button className="font-semibold">Shop Gaming Headsets</Button>
          <Button variant="outline" className="font-semibold">
            Explore Speakers
          </Button>
        </div>
        <div className="grid grid-cols-12 mt-6 gap-2">
          <div className="col-span-3 flex items-center">
            <FontAwesomeIcon
              icon={faTruckMoving}
              className="text-2xl text-(--accent) me-2"
            />
            <div>
              <h2 className="font-semibold text-sm">FREE DELIVERY</h2>
              <p className="text-(--muted-foreground) text-xs">
                On all orders over $50
              </p>
            </div>
          </div>
          <div className="col-span-3 flex items-center">
            <FontAwesomeIcon
              icon={faShield}
              className="text-2xl text-(--accent) me-2"
            />
            <div>
              <h2 className="font-semibold text-sm">2 YEAR WARRANTY</h2>
              <p className="text-(--muted-foreground) text-xs">
                Quality you can trust
              </p>
            </div>
          </div>
          <div className="col-span-3 flex items-center">
            <FontAwesomeIcon
              icon={faArrowRotateLeft}
              className="text-2xl text-(--accent) me-2"
            />
            <div>
              <h2 className="font-semibold text-sm">30 DAY RETURNS</h2>
              <p className="text-(--muted-foreground) text-xs">
                Hassle free returns
              </p>
            </div>
          </div>
          <div className="col-span-3 flex items-center">
            <FontAwesomeIcon
              icon={faLock}
              className="text-2xl text-(--accent) me-2"
            />
            <div>
              <h2 className="font-semibold text-sm">SECURE PAYMENT</h2>
              <p className="text-(--muted-foreground) text-xs">
                100% protected
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-6"></div>
    </section>
  );
}
