import React, { forwardRef, PropsWithChildren } from "react";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  name: string;
};

const CustomTextLogo = forwardRef<HTMLDivElement, Props>(
  ({ name, ...props }, ref) => {
    const nameArr = name.split(" ");
    return (
      <div ref={ref} {...props} className="">
        {nameArr.map((word, index) => (
          <span
            key={index}
            className="text-3xl md:text-4xl font-bold text-primary"
          >
            {word.toUpperCase()}
          </span>
        ))}
      </div>
    );
  }
);

export default CustomTextLogo;
