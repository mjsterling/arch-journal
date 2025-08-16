"use client";

import { useGlobalState } from "@/data/providers/GlobalStateProvider";
import { Materials, MaterialsByType } from "@/data/constants/Materials";
import { DigsiteNames, Digsites } from "@/data/constants/Digsites";
import { useContextMenu } from "@/data/providers/ContextMenuProvider";
import { useEffect } from "react";
import axios from "axios";
export default function MaterialStorage() {
  const { materialStorage } = useGlobalState();
  useEffect(() => {
    console.log(window.alt1);
  }, []);

  const importMaterialCounts = async () => {
    if (window.alt1) {
      console.log(window.alt1);
      const region = window.alt1.bindRegion(
        window.alt1.rsX,
        window.alt1.rsY,
        window.alt1.rsWidth,
        window.alt1.rsHeight
      );
      //   for (const material of Object.keys(materialStorage)) {
      console.log(region);
      const tai = await axios.get("/assets/materials/Third-age_iron.png", {
        responseType: "arraybuffer",
      });
      const buffer = Buffer.from(tai.data, "binary").toString("base64");
      console.log(buffer);
      // stuck here
      const subImage = window.alt1.bindFindSubImg(
        region,
        buffer,
        27,
        0,
        0,
        window.alt1.rsWidth,
        window.alt1.rsHeight
      );
      console.log(subImage);
      //   }
    } else {
      alert(
        "Alt1 is not available. Please ensure you are using the Alt1 client."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4 py-8">
      <div className="flex w-full justify-end">
        {window.alt1 ? (
          <button
            className="text-orange-100 font-semibold cursor-pointer hover:scale-102 transition-transform text-base border-orange-100 border-2 rounded-md px-3 py-1"
            onClick={importMaterialCounts}
          >
            Import Material Counts
          </button>
        ) : (
          <span className="text-sm text-orange-100">
            ! Alt1 not available. Please open in Alt1 browser to use material
            import feature.
          </span>
        )}
      </div>
      <div className="flex flex-col md:grid md:grid-cols-5 md:w-144 mx-auto">
        <MaterialStorageTitle title="Agnostic Materials" />
        {MaterialsByType.Agnostic.map((material) => (
          <MaterialStorageInput
            key={material}
            material={material}
            amount={materialStorage[material]}
            backgroundColor={"#CCC3"}
            borderColor={"#ccc"}
          />
        ))}
        <MaterialStorageTitle title="Armadylean Materials" />
        {MaterialsByType.Armadylean.map((material) => (
          <MaterialStorageInput
            key={material}
            material={material}
            amount={materialStorage[material]}
            backgroundColor={Digsites[DigsiteNames.Stormguard].backgroundColor}
            borderColor={Digsites[DigsiteNames.Stormguard].borderColor}
          />
        ))}
        <MaterialStorageTitle title="Bandosian Materials" />
        {MaterialsByType.Bandosian.map((material) => (
          <MaterialStorageInput
            key={material}
            material={material}
            amount={materialStorage[material]}
            backgroundColor={Digsites[DigsiteNames.Warforge].backgroundColor}
            borderColor={Digsites[DigsiteNames.Warforge].borderColor}
          />
        ))}
        <MaterialStorageTitle title="Dragonkin Materials" />
        {MaterialsByType.Dragonkin.map((material) => (
          <MaterialStorageInput
            key={material}
            material={material}
            amount={materialStorage[material]}
            backgroundColor={Digsites[DigsiteNames.Daemonheim].backgroundColor}
            borderColor={Digsites[DigsiteNames.Daemonheim].borderColor}
          />
        ))}
        <MaterialStorageTitle title="Saradominist Materials" />
        {MaterialsByType.Saradominist.map((material) => (
          <MaterialStorageInput
            key={material}
            material={material}
            amount={materialStorage[material]}
            backgroundColor={Digsites[DigsiteNames.Everlight].backgroundColor}
            borderColor={Digsites[DigsiteNames.Everlight].borderColor}
          />
        ))}
        <MaterialStorageTitle title="Zamorakian Materials" />
        {MaterialsByType.Zamorakian.map((material) => (
          <MaterialStorageInput
            key={material}
            material={material}
            amount={materialStorage[material]}
            backgroundColor={
              Digsites[DigsiteNames.InfernalSource].backgroundColor
            }
            borderColor={Digsites[DigsiteNames.InfernalSource].borderColor}
          />
        ))}
        <MaterialStorageTitle title="Zarosian Materials" />
        {MaterialsByType.Zarosian.map((material) => (
          <MaterialStorageInput
            key={material}
            material={material}
            amount={materialStorage[material]}
            backgroundColor={Digsites[DigsiteNames.KharidEt].backgroundColor}
            borderColor={Digsites[DigsiteNames.KharidEt].borderColor}
          />
        ))}
      </div>
    </div>
  );
}

const MaterialStorageTitle = ({ title }: { title: string }) => (
  <h3 className="text-lg text-center md:text-left font-medium w-full md:col-span-5 text-orange-100 my-4">
    {title}
  </h3>
);

const MaterialStorageInput = ({
  material,
  amount,
  backgroundColor,
  borderColor,
}: {
  material: Materials;
  amount: number;
  backgroundColor?: string;
  borderColor?: string;
}) => {
  const { updateMaterialStorage } = useGlobalState();
  const { createMaterialContextMenu } = useContextMenu();
  return (
    <div
      className="flex flex-row justify-between items-center pl-4 md:pl-0 mx-auto w-full max-w-[400px] md:max-w-full md:flex md:flex-col md:items-center md:max-w-full overflow-hidden gap-2 border md:pt-2 border-orange-100"
      style={{ backgroundColor, borderColor }}
    >
      <div className="flex gap-4 items-center">
        <img
          src={`/assets/materials/${material.replace(/ /g, "_")}.png`}
          alt={material}
          className="h-8 w-8 md:h-10 md:w-10 md:py-1 object-contain object-center cursor-help"
          title={material}
          onContextMenu={createMaterialContextMenu(material)}
        />
        <p className="text-orange-100 md:hidden font-semibold text-sm">
          {material}
        </p>
      </div>
      <input
        value={amount}
        onChange={(e) =>
          updateMaterialStorage(material, Number(e.target.value))
        }
        className="text-xl py-2 text-center bg-gray-800 text-orange-100 w-40 md:w-full"
      />
    </div>
  );
};
