'use client';

import React, { useRef, useEffect, useId } from 'react';

interface DissolveFadeInProps {
    children: React.ReactNode;
    duration?: number;
    maxDisplacement?: number;
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
    onComplete?: () => void;
}

const DissolveFadeIn: React.FC<DissolveFadeInProps> = ({
    children,
    duration = 1200,
    maxDisplacement = 2000,
    delay = 0,
    className = '',
    style = {},
    onComplete,
}) => {
    const uniqueId = useId();
    const filterRef = useRef<SVGFilterElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const hasAnimatedRef = useRef(false);

    const safeFilterId = `dissolve-fade-in-${uniqueId.replace(/:/g, '')}`;

    useEffect(() => {
        if (hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        const timer = setTimeout(() => {
            const disp = filterRef.current?.querySelector('feDisplacementMap') as SVGFEDisplacementMapElement | null;
            const bNoise = filterRef.current?.querySelector('feTurbulence[result="bigNoise"]') as SVGFETurbulenceElement | null;
            const content = contentRef.current;

            if (!disp || !bNoise || !content) {
                console.error('DissolveFadeIn: Missing required elements');
                return;
            }

            // Set random seed
            bNoise.setAttribute('seed', String(Math.floor(Math.random() * 1000)));

            // Initialize to dissolved state
            disp.setAttribute('scale', String(maxDisplacement));
            content.style.transform = 'scale(1.1)';
            content.style.opacity = '0';

            // Force a reflow to ensure initial state is applied
            void content.offsetHeight;

            // Start animation
            const startTime = performance.now();
            const ease = (t: number) => t * t * t; // cubic ease in

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = ease(progress);

                // Reverse dissolve: go from maxDisplacement to 0
                const currentDisplacement = maxDisplacement * (1 - eased);
                const currentScale = 1.1 - 0.1 * eased;
                const currentOpacity = progress < 0.5 ? progress * 2 : 1;

                disp.setAttribute('scale', String(currentDisplacement));
                content.style.transform = `scale(${currentScale})`;
                content.style.opacity = String(currentOpacity);

                if (progress < 1) {
                    animationRef.current = requestAnimationFrame(animate);
                } else {
                    // Cleanup
                    content.style.transform = 'scale(1)';
                    content.style.opacity = '1';
                    disp.setAttribute('scale', '0');
                    onComplete?.();
                }
            };

            animationRef.current = requestAnimationFrame(animate);
        }, delay);

        return () => {
            clearTimeout(timer);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [duration, maxDisplacement, delay, onComplete]);

    return (
        <>
            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                <defs>
                    <filter
                        ref={filterRef}
                        id={safeFilterId}
                        x="-200%"
                        y="-200%"
                        width="500%"
                        height="500%"
                        colorInterpolationFilters="sRGB"
                    >
                        <feTurbulence type="fractalNoise" baseFrequency="0.004" numOctaves={1} result="bigNoise" />
                        <feComponentTransfer in="bigNoise" result="bigNoiseAdjusted">
                            <feFuncR type="linear" slope={5} intercept={-2} />
                            <feFuncG type="linear" slope={5} intercept={-2} />
                        </feComponentTransfer>
                        <feTurbulence type="fractalNoise" baseFrequency={1} numOctaves={1} result="fineNoise" />
                        <feMerge result="mergedNoise">
                            <feMergeNode in="bigNoiseAdjusted" />
                            <feMergeNode in="fineNoise" />
                        </feMerge>
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="mergedNoise"
                            scale={maxDisplacement}
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>
            <div
                ref={contentRef}
                className={className}
                style={{
                    ...style,
                    filter: `url(#${safeFilterId})`,
                    WebkitFilter: `url(#${safeFilterId})`,
                    transform: 'scale(1.1)',
                    opacity: 0,
                }}
            >
                {children}
            </div>
        </>
    );
};

export default DissolveFadeIn;
