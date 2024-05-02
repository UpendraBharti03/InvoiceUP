import { useMemo } from "react";
import { Descriptions } from "antd";
import { DescriptionsProps } from "antd/es/descriptions";
import { useUiSettingsContext } from "../settings";

export function ADescriptions(props:DescriptionsProps) {
  const { size: configSize } = useUiSettingsContext();
  const size = useMemo(() => {
    switch (configSize) {
        case 'medium': {
            return 'middle';
        }
        case 'large': {
          return 'default';
        }
        default: {
            return configSize;
        }
    }
  }, [configSize]);
  
  return (
    <Descriptions size={size} {...props}/>
  );
}
