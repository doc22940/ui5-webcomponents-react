import { AvatarSize } from '@ui5/webcomponents-react/lib/AvatarSize';
import { FlexBox } from '@ui5/webcomponents-react/lib/FlexBox';
import { FlexBoxDirection } from '@ui5/webcomponents-react/lib/FlexBoxDirection';
import React, { CSSProperties, FC, ReactElement, useMemo, forwardRef } from 'react';
import { safeGetChildrenArray } from './ObjectPageUtils';

interface Props {
  image: string | ReactElement;
  imageShapeCircle: boolean;
  classes: any;
  showTitleInHeaderContent: boolean;
  renderHeaderContentProp: () => JSX.Element;
  renderBreadcrumbs: () => JSX.Element;
  renderKeyInfos: () => JSX.Element;
  title: string;
  subTitle: string;
  headerPinned: boolean;
  topHeaderHeight: number;
}

export const ObjectPageHeader: FC<Props> = forwardRef((props: Props, ref: any) => {
  const {
    image,
    classes,
    imageShapeCircle,
    showTitleInHeaderContent,
    renderHeaderContentProp,
    renderBreadcrumbs,
    title,
    subTitle,
    renderKeyInfos,
    headerPinned,
    topHeaderHeight
  } = props;

  let avatar = null;

  if (image) {
    if (typeof image === 'string') {
      avatar = (
        <span
          className={classes.headerImage}
          style={{ borderRadius: imageShapeCircle ? '50%' : 0, overflow: 'hidden' }}
        >
          <img src={image} className={classes.image} alt="Company Logo" />
        </span>
      );
    } else {
      avatar = React.cloneElement(image, {
        size: AvatarSize.L,
        className: image.props?.className ? `${classes.headerImage} ${image.props?.className}` : classes.headerImage
      } as unknown);
    }
  }

  const headerStyles = useMemo<CSSProperties>(() => {
    if (headerPinned) {
      return {
        position: 'sticky',
        top: `${topHeaderHeight}px`,
        zIndex: 1
      };
    }
    return null;
  }, [headerPinned, topHeaderHeight]);

  if (showTitleInHeaderContent) {
    const headerContents = renderHeaderContentProp && renderHeaderContentProp();
    let firstElement;
    let contents = [];

    if (headerContents?.type === React.Fragment) {
      [firstElement, ...contents] = safeGetChildrenArray(headerContents.props.children);
    } else {
      firstElement = headerContents;
    }
    return (
      <div style={headerStyles} className={classes.contentHeader} ref={ref}>
        <div className={classes.headerContent}>
          <FlexBox>
            {avatar}
            <FlexBox direction={FlexBoxDirection.Column}>
              <div>{renderBreadcrumbs && renderBreadcrumbs()}</div>
              <FlexBox>
                <FlexBox direction={FlexBoxDirection.Column}>
                  <h1 className={classes.title}>{title}</h1>
                  <span className={classes.subTitle}>{subTitle}</span>
                  <span> {firstElement}</span>
                </FlexBox>
                <FlexBox>
                  {contents.map((c, index) => (
                    <div key={`customContent-${index}`} className={classes.headerCustomContentItem}>
                      {c}
                    </div>
                  ))}
                </FlexBox>
                <div className={classes.keyInfos}>{renderKeyInfos && renderKeyInfos()}</div>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </div>
      </div>
    );
  }

  return (
    <div style={headerStyles} className={classes.contentHeader} ref={ref}>
      <div className={classes.headerContent}>
        {avatar}
        {renderHeaderContentProp && <span className={classes.headerCustomContent}>{renderHeaderContentProp()}</span>}
      </div>
    </div>
  );
});

ObjectPageHeader.displayName = 'ObjectPageHeader';
