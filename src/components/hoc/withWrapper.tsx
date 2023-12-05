import React from 'react';

const withWrapper = (WrappedComponent:React.FC) => {
    const WithWrapper = ({...props}) => {
        return (
            <div className="p-16 min-h-screen">
                <WrappedComponent {...props} />
            </div>
        );
    };

    return WithWrapper;
};

export default withWrapper;