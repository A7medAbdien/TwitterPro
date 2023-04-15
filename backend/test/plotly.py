import matplotlib
import seaborn as sns
import matplotlib.pyplot as plt
import io

"""
Test
"""

class RandomNumbers:
    def __init__(self, n):
        self.n = n
        self.data = np.random.randint(0, 100, n)

    def get_data(self):
        return self.data.tolist()

    def add(self, n):
        self.data = np.append(self.data, np.random.randint(0, 100, n))


@app.get("/hist/{n}",
         responses={
             404: {"description": "Not Found"},
             200: {"content": {"image/png": {}}}
         })
async def hist(n: int):
    r = RandomNumbers(n)
    fig = sns.histplot(r.get_data(), bins=10).get_figure()
    with io.BytesIO() as fig_bytes:
        fig.savefig(fig_bytes, format="png")
        fig_bytes.seek(0)
        response = Response(fig_bytes.getvalue(), media_type='image/png')
        plt.close()
    return response