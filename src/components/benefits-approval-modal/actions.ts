import {
    BENEFIT_APPROVAL_ADD,
    BENEFIT_APPROVAL_DESCRIPTION_CHANGE,
    BENEFIT_APPROVAL_MODAL_TOGGLE,
    BENEFIT_APPROVAL_NAME_CHANGE,
    BENEFIT_LIST_LOADING,
    BENEFITS_SUCCESS,
    BENEFITS_FAILED,
    BENEFIT_APPROVAL_REMOVE,
    BENEFIT_APPROVAL_CLEAR
} from './types'
import api from 'src/store/api';
import { IBenefit } from '../benefits-modal/types';

export function benefitApprovalModalToggle() {
    return { type: BENEFIT_APPROVAL_MODAL_TOGGLE }
}

export function benefitApprovalNameChange(value: string) {
    return { type: BENEFIT_APPROVAL_NAME_CHANGE, value }
}

export function benefitApprovalDescriptionChange(value: string) {
    return { type: BENEFIT_APPROVAL_DESCRIPTION_CHANGE, value }
}

export function benefitApprovalAdd() {
    return { type: BENEFIT_APPROVAL_ADD }
}

export function benefitApprovalRemove(name: string) {
    return { type: BENEFIT_APPROVAL_REMOVE, name }
}

export function benefitApprovalClear() {
    return { type: BENEFIT_APPROVAL_CLEAR }
}

export function benefitApprovalOpen(taskId: number) {
    return dispatch => {
        dispatch({ type: BENEFIT_LIST_LOADING });
        return api.tasks.detail(taskId)
            .then(response => {
                // tslint:disable-next-line:no-string-literal
                const responseBenefits: any[] = response.data['offeredBenefits'];
                // tslint:disable-next-line:no-string-literal
                const benefits: IBenefit[] = responseBenefits.map<IBenefit>(item => {
                    if (item['com.myspace.hr_hiring.JobRoleBenefit']) {
                        return { ...item['com.myspace.hr_hiring.JobRoleBenefit'] };
                    } else {
                        return { ...item };
                    }
                })
                dispatch(benefitApprovalModalToggle());
                return dispatch({ type: BENEFITS_SUCCESS, benefits });
            })
            .catch(err => {
                return dispatch({ type: BENEFITS_FAILED, serverErrors: err });
            });
    }
}
