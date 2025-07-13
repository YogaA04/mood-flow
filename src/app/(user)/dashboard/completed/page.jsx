import CardMyDay from "@/components/ui/myDay/CardMyDay";

export default function CompletedTodoList() {
    return (
        <div className="p-6 mt-10 w-full">
            <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-500 drop-shadow mb-4">
                Tugas Selesai
            </h2>
            <CardMyDay checked={true}/>
        </div>
    );
}