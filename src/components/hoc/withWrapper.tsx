import React from 'react';

const withWrapper = (WrappedComponent:React.FC) => {
    const WithWrapper = ({...props}) => {
        return (
            <div className="my-6 py-8 min-h-screen custom-container">
                <WrappedComponent {...props} />
            </div>
        );
    };

    return WithWrapper;
};

export default withWrapper;