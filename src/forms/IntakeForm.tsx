import { SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./Form.css";

//text field 
//A Radio Select field with 3 values
//A dropdown menu that displays the years descending starting from this year and ending at 2002

//The text field and radio select field are required fields

//When the Submit button is clicked, it should display the value of the text field in an alert, and print out the values of all three questions in a debug console statement.

//Style the form so that it sits in the center of the page.
interface InputFormInput {
    email: string,
    dateOfBirth: string,
    trialSelection: string,

};

const IntakeForm = () => {
    const { register, handleSubmit, formState: { errors }
    } = useForm<InputFormInput>();
    const onSubmit: SubmitHandler<InputFormInput> = (data) => {
        alert(JSON.stringify(data.email));
        console.log(data)
    };
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
                        <input type="text" {...register("email", { required: true })} placeholder="enter your email here" />
                    </li>
                    {errors?.email?.type === "required" && <p className="error-field">Please provide a valid email</p>}
                    <li>
                        <label className="primary-label">Clinical Trial</label>
                        <ul className="flex-inner">
                            {trialOptions.map(trial => <li key={trial}><label className="primary-label"><input type="radio" {...register("trialSelection", { required: true })} value={trial} />{trial}</label></li>)}
                        </ul>
                    </li>
                    {errors?.email?.type === "required" && <p className="error-field">Please select a trial</p>}
                    <li>
                        <label className="primary-label">Date of Birth</label>
                        <select className="select-style"{...register("dateOfBirth", { required: true })} >
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

    const dropdownYears = []
    for (let i = currentDate; i >= currentDate - years; i--) {
        dropdownYears.push(i.toString())
    }
    return dropdownYears
}