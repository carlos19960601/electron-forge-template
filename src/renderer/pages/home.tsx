import { AppSettingsProviderContext } from "@renderer/context/app-settings-provider";
import { t } from "i18next";
import { useContext, useEffect, useState } from "react";
import { Button } from "../components/ui";

const Home = () => {
	const { EnjoyApp } = useContext(AppSettingsProviderContext);
	const [platformInfo, setPlatformInfo] = useState<PlatformInfoType>();

	useEffect(() => {
		EnjoyApp.app.getPlatformInfo().then(setPlatformInfo);
	}, []);

	return (
		<div className="h-full flex justify-center items-center">
			<div className="flex flex-col gap-4">
				<div className="flex gap-4">
					<span className="font-bold">Translation:</span>
					<span>{t("sidebar.home")}</span>
				</div>
				<div className="flex gap-4">
					<span className="font-bold">Platform:</span>
					<span>{platformInfo?.platform}</span>
				</div>
				<div className="flex gap-4">
					<span className="font-bold">Arch:</span>
					<span>{platformInfo?.arch}</span>
				</div>
				<div className="flex gap-4">
					<span className="font-bold">Version:</span>
					<span>{platformInfo?.version}</span>
				</div>

				<Button>ok</Button>
			</div>
		</div>
	);
};

export default Home;
