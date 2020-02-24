import { useCallback } from 'react'


const useOnBack = function () {
    return useCallback(() => {
        return window.history.back()
    }, [])
}


// const useOnBack = useCallback(() => {
//     return window.history.back()
// }, [])

export default useOnBack