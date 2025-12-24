import * as React from "react";
import type { JSXElement } from "@fluentui/react-components";
import {
  makeStyles,
  tokens,
  Button,
} from "@fluentui/react-components";
import { CheckmarkFilled, ArrowClockwiseRegular } from "@fluentui/react-icons";
import { useTimeout } from "@fluentui/react-components";

const useStyles = makeStyles({
  wrapper: {
    columnGap: "15px",
    display: "flex",
  },
  buttonNonInteractive: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorNeutralForeground1,
    cursor: "default",
    pointerEvents: "none",
    [`& .${tokens.colorStatusSuccessForeground1}`]: {
      color: tokens.colorStatusSuccessForeground1,
    },
  },
});

type LoadingState = "initial" | "loading" | "loaded";

export const ButtonLoadingExample = (): JSXElement => {
  const styles = useStyles();
  const [loadingState, setLoadingState] =
    React.useState<LoadingState>("initial");
  const [setTimeout, cancelTimeout] = useTimeout();

  const onButtonClick = () => {
    setLoadingState("loading");
    setTimeout(() => setLoadingState("loaded"), 5000);
  };

  const buttonContent =
    loadingState === "loading"
      ? "Loading"
      : loadingState === "loaded"
      ? "Loaded"
      : "Start loading";

  // Usar la prop loading en lugar de Spinner como icono
  const isLoading = loadingState === "loading";
  const isLoaded = loadingState === "loaded";

  const buttonIcon =
    isLoaded ? (
      <CheckmarkFilled />
    ) : loadingState === "initial" ? (
      <ArrowClockwiseRegular />
    ) : undefined;

  const buttonClassName =
    loadingState === "initial" ? undefined : styles.buttonNonInteractive;

  const onResetButtonClick = () => {
    cancelTimeout();
    setLoadingState("initial");
  };

  return (
    <div className={styles.wrapper}>
      <Button
        className={buttonClassName}
        disabledFocusable={loadingState !== "initial"}
        icon={!isLoading ? buttonIcon : undefined}
        loading={isLoading}
        onClick={onButtonClick}
      >
        {buttonContent}
      </Button>
      <Button onClick={onResetButtonClick}>Reset loading state</Button>
    </div>
  );
};







