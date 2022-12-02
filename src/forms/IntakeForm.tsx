import { SubmitHandler, useForm } from "react-hook-form";
import { regexEmailExpression } from "../utils/utils";
import "./Form.css";
interface InputFormInput {
    email: string,
    trialYear: string,
    trialSelection: string,

};
const IntakeForm = () => {
    //use the useForm hook to capture registered input values into an object/ validate input values 
    const { register, handleSubmit, formState: { errors }
    } = useForm<InputFormInput>();
    //on form submit 
    const onSubmit: SubmitHandler<InputFormInput> = (data) => {
        //display value of text field (email)  in an alert
        alert(data.email);
        //print values of all three questions in a debug console statement
        console.debug('Question Values', Object.values(data));
    };
    //function takes x number of years and returns an array of date strings based on the input less the current year
    const intakeFormYearValue = years(20);
    const trialOptions = ["Trial 1", "Trial 2", "Trial 3"];
    return (
        <div className="form-box">
            <form className="intake-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-header">
                    <h1>Clinical Trial Registration</h1>
                </div>
                <ul className="flex-outer">
                    <li>
                        <label className="primary-label">Email</label>
                        <input type="text" {...register("email", { required: true, pattern: regexEmailExpression })} placeholder="enter your email here" />
                    </li>
                    {errors?.email?.type === "required" && <p className="error-field">Please provide an email address</p>}
                    {errors?.email?.type === "pattern" && <p className="error-field">Please provide a valid email address</p>}
                    <li>
                        <label className="primary-label">Clinical Trial</label>
                        <ul className="flex-inner">
                            {trialOptions.map(trial => <li key={trial}><label className="primary-label"><input type="radio" {...register("trialSelection", { required: true })} value={trial} />{trial}</label></li>)}
                        </ul>
                    </li>
                    {errors?.trialSelection?.type === "required" && <p className="error-field">Please select a trial</p>}
                    <li>
                        <label className="primary-label">Year of Trial</label>
                        <select className="select-style"{...register("trialYear", { required: true })} >
                            {intakeFormYearValue.map((year) => { return <option value={year} key={year}>{year}</option> })}
                        </select>
                    </li>
                    <li>
                        <button className="submit-buttom" type="submit"> Submit </button>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default IntakeForm

const years = (years: number): string[] => {
    const currentDate = new Date().getFullYear();
    const dropdownYears = [];
    for (let i = currentDate; i >= currentDate - years; i--) {
        dropdownYears.push(i.toString());
    };
    return dropdownYears;
}