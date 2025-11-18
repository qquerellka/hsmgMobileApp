import { params } from "@/shared/config/params";
import { palette } from "@/shared/config/theme";
import React, { forwardRef } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type UiInputProps = Omit<TextInputProps, "style"> & {
  fontSize?: number;                 
  style?: TextInputProps["style"];
};

export const UiInput = forwardRef<TextInput, UiInputProps>(
  ({ fontSize, style, ...rest }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={[styles.input, fontSize != null ? { fontSize } : null, style]}
        {...rest}
      />
    );
  }
);

UiInput.displayName = "UiInput";

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: params.input.borderRadius,
    paddingHorizontal: params.input.paddingHorizontal,
    paddingVertical: params.input.paddingVertical,
    fontSize: 16, 
    backgroundColor: palette.white,
  },
});
