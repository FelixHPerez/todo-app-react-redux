import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "./darkModeSlice";
import { LightIcon, MoonIcon } from "../../components/Icons";
import { Switch } from "@headlessui/react";
import { useEffect } from "react";

const Header = () => {
  const { darkMode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="fixed top-0 z-10 flex w-full min-w-min items-center justify-between border-b border-slate-900/10 px-4 py-2 backdrop-blur-md dark:border-slate-50/[0.06]">
      <h1 className="font-bold uppercase tracking-widest text-slate-900 dark:text-white">
        Tasks
      </h1>
      <Switch
        checked={darkMode}
        onChange={() => dispatch(toggleDarkMode())}
        className="relative flex h-10 w-20 items-center justify-around rounded-2xl"
        aria-label="Toggle Dark Mode"
      >
        <LightIcon className="h-7 w-7 rounded-full p-1 dark:text-slate-300" />
        <div className="h-5/6 w-[1px] bg-slate-900/10 dark:bg-slate-50/[0.06]"></div>
        <div className="transition-[background-color, transform] absolute left-0 -z-50 h-8 w-8 translate-x-[2px] rounded-full bg-yellow-300 duration-500 dark:translate-x-[46.2px] dark:bg-stone-300"></div>
        <MoonIcon className="h-7 w-7 rounded-full p-1 text-slate-300 dark:text-black" />
      </Switch>
    </header>
  );
};
export default Header;
