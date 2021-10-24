import React from "react";
import NavBar from "../components/NavBar";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";

const stats = [
  {
    name: "Total XP",
    stat: "71,897",
    previousStat: "70,946",
    change: "12%",
    changeType: "increase",
  },
  {
    name: "Avg. XP Rate/Week",
    stat: "58.16",
    previousStat: "49.01",
    change: "18.67%",
    changeType: "increase",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Account() {
  return (
    <div>
      <NavBar />

      <div className=" h-screen pb-20 bg-gradient-to-b from-gray-900 to-purple-900 relative z-40">
        <div className="stars h-96">
          <h3 className="text-5xl mb-4 drop-shadow-lg font-extrabold tracking-tight text-center my-0 text-white">
            Account Information
          </h3>
          <div className="mx-auto rounded-lg block m-24 text-center bg-gray-100 w-10/12 h-full">
            <div className="flex bg-gradient-to-t from-white to-gray-200 h-10/12">
              <dl className="my-5 mx-auto grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-2 md:divide-y-0 md:divide-x">
                {stats.map((item) => (
                  <div key={item.name} className="px-4 py-5 sm:p-6">
                    <dt className="text-base font-normal text-gray-900">
                      {item.name}
                    </dt>
                    <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                      <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                        {item.stat}
                        <span className="ml-2 text-sm font-medium text-gray-500">
                          from {item.previousStat}
                        </span>
                      </div>

                      <div
                        className={classNames(
                          item.changeType === "increase"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800",
                          "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
                        )}
                      >
                        {item.changeType === "increase" ? (
                          <ArrowSmUpIcon
                            className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <ArrowSmDownIcon
                            className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        )}

                        <span className="sr-only">
                          {item.changeType === "increase"
                            ? "Increased"
                            : "Decreased"}{" "}
                          by
                        </span>
                        {item.change}
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
